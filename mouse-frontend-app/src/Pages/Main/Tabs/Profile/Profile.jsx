import { useState } from "react";
import PersonalData from "./Components/PersonalData";
import PhysicalData from "./Components/PhysicalData";
import Contacts from "./Components/Contacts";

export default function Profile({ isProfileFilled }) {
  const [editProfile, setEditProfile] = useState(false);
  return (
    <div>
      <PersonalData editProfile={editProfile}></PersonalData>
      <div>
        <PhysicalData editProfile={editProfile}></PhysicalData>
        <Contacts editProfile={editProfile}></Contacts>
      </div>
      <button>
        {!isProfileFilled
          ? "Заполнить профиль"
          : editProfile
          ? "Сохранить"
          : "Обновить профиль"}
      </button>
    </div>
  );
}
