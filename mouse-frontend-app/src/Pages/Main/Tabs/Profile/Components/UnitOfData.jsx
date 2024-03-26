export default function UnitOfData({ editMode, data, type, name, onChange }) {
  return (
    <>
      {editMode ? (
        <input type={type} name={name} value={data} onChange={onChange}></input>
      ) : (
        <div>{data}</div>
      )}
    </>
  );
}
