export default function Contacts({ editProfile }) {
  return (
    <>
      <label>Контакты</label>
      <label>Телефон</label>
      {editProfile ? <input type={"text"}></input> : <label></label>}
      <label>Email</label>
      {editProfile ? <input type={"text"}></input> : <label></label>}
    </>
  );
}
