import db from '../config/database.js';

// Get profile settings (public endpoint)
export const getProfile = (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profile_settings WHERE id = 1').get();

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update profile settings (protected)
export const updateProfile = (req, res) => {
  try {
    const {
      name, tagline, bio, email, location, linkedin_url, instagram_url,
      availability_status, years_experience, education
    } = req.body;

    // Check if profile exists
    const existing = db.prepare('SELECT * FROM profile_settings WHERE id = 1').get();

    const profileImage = req.file ? `/uploads/${req.file.filename}` : (existing?.profile_image || null);

    if (existing) {
      // Update existing profile
      db.prepare(`
        UPDATE profile_settings
        SET name = ?, tagline = ?, bio = ?, email = ?, location = ?,
            linkedin_url = ?, instagram_url = ?, profile_image = ?,
            availability_status = ?, years_experience = ?, education = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `).run(
        name, tagline, bio, email, location, linkedin_url, instagram_url,
        profileImage, availability_status, years_experience, education
      );
    } else {
      // Create new profile
      db.prepare(`
        INSERT INTO profile_settings (
          name, tagline, bio, email, location, linkedin_url, instagram_url,
          profile_image, availability_status, years_experience, education
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        name, tagline, bio, email, location, linkedin_url, instagram_url,
        profileImage, availability_status, years_experience, education
      );
    }

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Upload profile image (protected)
export const uploadProfileImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const profileImage = `/uploads/${req.file.filename}`;

    db.prepare('UPDATE profile_settings SET profile_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1').run(profileImage);

    res.json({
      success: true,
      image_url: profileImage,
      message: 'Profile image uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
};
