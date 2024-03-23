export default function PhysicalData({ editProfile }) {
  return (
    <>
      <label>Физические данные</label>
      <label>Рост</label>
      {editProfile ? <input type={"text"}></input> : <label></label>}
      <label>Вес</label>
      {editProfile ? <input type={"text"}></input> : <label></label>}
    </>
  );
}
