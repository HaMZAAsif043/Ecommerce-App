import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";

const ProfilePage = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const { getAllOrders } = useOrder();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    address: user?.address || "123 Main St, Anytown, USA",
  });

  const orders = getAllOrders();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <Button size="sm" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full sm:w-auto"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() =>
                        navigate(`/order-confirmation/${order.id}`)
                      }
                    >
                      <div className="flex flex-col sm:flex-row justify-between mb-2">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </p>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-500">
                          Delivery:{" "}
                          {new Date(
                            order.estimatedDelivery,
                          ).toLocaleDateString()}
                        </p>
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    You haven't placed any orders yet.
                  </p>
                  <Button onClick={() => navigate("/products")}>
                    Start Shopping
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  You don't have any saved addresses yet.
                </p>
                <Button variant="outline">Add New Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  You don't have any saved payment methods yet.
                </p>
                <Button variant="outline">Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
