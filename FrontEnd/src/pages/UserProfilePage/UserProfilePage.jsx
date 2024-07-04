import React from "react";
import Header from "../../components/Header/Header";
import "./UserProfilePage.css"; // Bạn có thể tạo và tùy chỉnh CSS cho HomePage nếu cần
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import ProfilePage from "../../pages/ProfilePage/UserProfile";

function UserProfilePage() {
  return (
    <div className="home-page">
      <div className="Head">
        <Header />
        <Navbar />
      </div>
      <hr />
      <div>
        <ProfilePage />
      </div>

      <Footer />
    </div>
  );
}

export default UserProfilePage;
