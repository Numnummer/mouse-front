export default function UnitOfData({ editMode, data, name, onChange }) {
  return (
    <>
      {editMode ? (
        <input name={name} value={data} onChange={onChange}></input>
      ) : (
        <div>{data}</div>
      )}
    </>
  );
}
