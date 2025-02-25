import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function InfoModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);
  const handleShow = () => setShow(true);

  useState(() => {
    setTimeout(() => {
      // Trigger Modal When page loads
      // handleShow();
    }, 1000);
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="p-0 m-0">
        <div className="modal-dialog p-0 m-0">
          <div className="modal-content p-0 m-0">
            <div className="modal-body p-0 border-rounded">
              <div className="position-relative">
                <a
                  href="https://www.uketalearning.com/courses/clf2mfkhw0016u8bkgqlo0ktf"
                  target="_blank"
                >
                  <img
                    src="/public-speaking-flyer.jpeg"
                    className="w-100 rounded position-absolute"
                    style={{ zIndex: 1051 }}
                  />
                </a>
                <div
                  className="w-100 p-3 position-absolute"
                  style={{ zIndex: 1052 }}
                >
                  <div className="w-100 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      onClick={handleClose}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
