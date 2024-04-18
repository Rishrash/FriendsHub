import axios from "axios";

const apiUrl = "https://friendshub-0y8a.onrender.com";

const AdminService = {
  deleteReportsFromPost: async (postId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/deleteReportsFromPost`,
        {
          postId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting reports from post:", error);
      throw error;
    }
  },

  deletePostById: async (postId) => {
    try {
      const response = await axios.put(`${apiUrl}/api/admin/deletePostById`, {
        postId,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting post by ID:", error);
      throw error;
    }
  },

  blockPostById: async (postId) => {
    try {
      const response = await axios.put(`${apiUrl}/api/admin/blockPostById`, {
        postId,
      });
      return response.data;
    } catch (error) {
      console.error("Error blocking post by ID:", error);
      throw error;
    }
  },

  deleteReportsFromUserAccount: async (userId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/deleteReportsFromUserAccount`,
        {
          userId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting reports from user:", error);
      throw error;
    }
  },

  blockUserById: async (userId) => {
    try {
      const response = await axios.put(`${apiUrl}/api/admin/blockUserById`, {
        userId,
      });
      return response.data;
    } catch (error) {
      console.error("Error blocking user by ID:", error);
      throw error;
    }
  },

  getReportedPosts: async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/getReportedPosts`);
      const data = await response.data;
      console.log("Data - " + data);
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
};

export default AdminService;
