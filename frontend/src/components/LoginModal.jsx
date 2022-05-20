import Modal from 'react-modal';
import { useState } from 'react';

export default () => {
    const [modalIsOpen, setModal] = useState(false);

    const customStyles = {};

    function show() {
        setModal(true);
    }

    function hide() {
        setModal(false);
    }

    return (
        <>
            <button onClick={show}>show</button>

            <Modal isOpen={modalIsOpen} onRequestClose={hide} style={customStyles} contentLabel="Example Modal">
                <h1 className="bg-orange-400">Hello</h1>
            </Modal>
        </>
    );
};
