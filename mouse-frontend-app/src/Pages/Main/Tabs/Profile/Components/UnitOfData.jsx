import "./UnitOfData.css";

export default function UnitOfData({ editMode, data, type, name, onChange }) {
  return (
    <>
      {editMode ? (
        <div>
          <input
            type={type}
            name={name}
            value={data}
            onChange={onChange}
          ></input>
        </div>
      ) : (
        <div className="editModeData">{data}</div>
      )}
    </>
  );
}
