import ReactModal from "react-modal";

function Modal({ isOpen, children }: { isOpen: boolean; children: any }) {
	return (
		<ReactModal
			className="z-50 flex items-center justify-center w-full h-full"
			overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			isOpen={isOpen}
			ariaHideApp={false}
			shouldCloseOnEsc={true}
			shouldCloseOnOverlayClick={true}
		>
			{children}
		</ReactModal>
	);
}

export default Modal;
