import { currentTabItem } from "../../../Constants/LocalStorageItemKeys";
import { useEffect, useState } from "react";

export default function useTab() {
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem(currentTabItem)
  );
  useEffect(() => {
    localStorage.setItem(currentTabItem, currentTab);
  }, [currentTab]);
  return [currentTab, setCurrentTab];
}
