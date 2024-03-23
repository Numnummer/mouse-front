export default function PersonalData({ editProfile }) {
  return (
    <>
      <label>Персональные данные</label>
      <img></img>
      <div>
        <label>Имя</label>
        {editProfile ? (
          <input type={"text"}></input>
        ) : (
          <label>Самарин Антон</label>
        )}
        <label>Дата рождения</label>
        {editProfile ? <input type={"text"}></input> : <label></label>}
      </div>
    </>
  );
}
