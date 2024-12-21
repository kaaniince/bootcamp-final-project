import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(ENDPOINTS.AUTH.UPDATE_PROFILE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          name: formData.name,
          email: formData.email,
        }));
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              <FaUser className="mr-2" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              <FaEnvelope className="mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              <FaLock className="mr-2" />
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              <FaLock className="mr-2" />
              New Password (optional)
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-brown-600 text-white py-3 px-4 rounded-md font-medium ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-brown-700"
            } transition duration-200 ease-in-out transform hover:-translate-y-1`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
