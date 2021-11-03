import Modal from 'react-modal'
import { Box, Flex, Icon, IconButton, Text} from '@chakra-ui/react'

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        background:'rgba(0,0,0,0.5)',
        top: 0,
        bottom: 0,
        right:0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
  };

export default function ModalContact({isOpen, onRequestClose} : ModalProps) {
   return (
    <Modal isOpen={isOpen} 
    onRequestClose={onRequestClose}
    style={customStyles}
    >
       <Text>Olá eu sou um Modal</Text>
      
    </Modal>
   )
}