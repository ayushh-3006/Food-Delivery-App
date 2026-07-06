
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";

const Settings = () => {
  const { user, setUser } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [profilePicPreview, setProfilePicPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const fileURL = URL.createObjectURL(file);
    setProfilePicPreview(fileURL);
    setProfilePic(file);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setProfilePicPreview(null);
    setProfilePic(null);
    setIsEditable(false);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);
      
      if (profilePic) {
        payload.append("displayPic", profilePic);
      }

      const res = await api.put("/user/edit-profile", payload);
      const updatedUser = res.data.data;

      setUser(updatedUser);
      sessionStorage.setItem("cravingUser", JSON.stringify(updatedUser));

      setProfilePicPreview(null);
      setProfilePic(null);
      setIsEditable(false);
      toast.success(res.data.message || "Profile updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to safely pull out your avatar url from mixed data types
  const getAvatarUrl = () => {
    if (profilePicPreview) return profilePicPreview;
    if (!user?.photo) return "https://via.placeholder.com/150";
    if (typeof user.photo === "string") return user.photo;
    return user.photo.url || "https://via.placeholder.com/150";
  };

  return (
    <>
      {/* Profile Header Block with Avatar Banner style */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-8 border-b border-gray-800">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-amber-500/30 group-hover:ring-amber-500 transition-all duration-300 shadow-xl bg-neutral-900">
            <img
              src={getAvatarUrl()}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {isEditable && (
            <>
              <label
                htmlFor="profilePicInput"
                className="absolute inset-0 bg-black/70 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-amber-400 gap-1"
                title="Change Photo"
              >
                <MdOutlineAddAPhoto className="text-xl" />
                <span className="text-[9px] uppercase font-bold tracking-wider">
                  Change
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="profilePicInput"
                className="hidden"
                onChange={handleProfilePicChange}
                disabled={isLoading}
              />
            </>
          )}
        </div>

        <div className="text-center sm:text-left">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 mb-1">
            Premium Member
          </span>
          <h3 className="text-xl font-bold text-amber-500 tracking-tight">
            {user?.fullName}
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage your personal account credentials
          </p>
        </div>
      </div>

      {isEditable === true ? (
        <>
          {/* Edit Mode: Hotstar Premium Input Containers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mb-8">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 text-sm text-white font-medium placeholder-neutral-600 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200 shadow-inner"
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full bg-neutral-950 border border-neutral-900/50 rounded-xl p-3.5 text-sm text-neutral-500 cursor-not-allowed font-medium"
                  disabled
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-neutral-600 bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-800">
                  Lock
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 text-sm text-white font-medium placeholder-neutral-600 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200 shadow-inner"
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* View Mode: Premium Account Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-8">
            <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-5 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                  Registered Name
                </span>
                <span className="text-base font-semibold text-white tracking-wide">
                  {user?.fullName}
                </span>
              </div>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-5 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                  Primary Email
                </span>
                <span className="text-base font-semibold text-neutral-300 tracking-wide break-all">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-5 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between group sm:col-span-2">
              <div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                  Phone Line
                </span>
                <span className="text-base font-semibold text-neutral-300 tracking-wide">
                  {user?.phone || "Not Provided"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Button Tray Actions */}
      <div className="flex items-center gap-3 border-t border-neutral-900 pt-6">
        {isEditable === true ? (
          <>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl border border-neutral-800 text-sm font-semibold text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-7 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-neutral-950 font-bold text-sm rounded-xl hover:from-amber-400 hover:to-orange-400 active:scale-95 shadow-lg shadow-orange-500/10 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditable(true)}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl border border-neutral-800 hover:border-neutral-700 active:scale-95 transition-all duration-200 shadow-md"
          >
            Edit Profile
          </button>
        )}
      </div>
    </>
  );
};

export default Settings;
