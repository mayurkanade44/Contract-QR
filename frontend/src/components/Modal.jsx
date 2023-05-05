import { useDataContext } from "../context/data_context";

const Modal = () => {
  const { closeModal, serviceReport } = useDataContext();
  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="btn-primary"
          onClick={closeModal}
          disabled={serviceReport ? false : true}
        >
          <a
            style={{
              textDecoration: "none",
              color: "white",
            }}
            href={serviceReport}
          >
            Download
          </a>
        </button>
      </div>
    </div>
  );
};
export default Modal;
