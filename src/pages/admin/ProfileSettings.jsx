import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload } from 'lucide-react';
import { profileAPI } from '../../utils/api';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    bio: '',
    email: '',
    location: '',
    linkedin_url: '',
    instagram_url: '',
    availability_status: '',
    years_experience: '',
    education: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileAPI.get();
      setFormData(data);
      setCurrentImage(data.profile_image);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (profileImage) {
        data.append('profile_image', profileImage);
      }

      await profileAPI.update(data);
      alert('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center py-12 text-text-muted">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Profile Image</h2>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
              {currentImage ? (
                <img
                  src={currentImage.startsWith('/') ? `http://localhost:5000${currentImage}` : currentImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl font-extrabold gradient-text">
                  {formData.name?.charAt(0) || 'K'}
                </div>
              )}
            </div>
            <div>
              <label className="px-6 py-3 bg-primary-orange text-white rounded-full font-medium magnetic-btn inline-flex items-center gap-2 cursor-pointer">
                <Upload size={20} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-text-muted text-sm mt-2">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Years Experience</label>
                <input
                  type="text"
                  name="years_experience"
                  value={formData.years_experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Availability Status</label>
              <input
                type="text"
                name="availability_status"
                value={formData.availability_status}
                onChange={handleChange}
                placeholder="e.g., Available for Full-Time & Contract Work"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
