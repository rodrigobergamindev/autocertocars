import {
    
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";

  import {HStack, Icon} from '@chakra-ui/react'
  import {RiFacebookBoxFill, RiTelegramFill, RiTelegramLine, RiWhatsappFill} from 'react-icons/ri'
  import {SiTelegram, SiTwitter} from 'react-icons/si'

  export default function Share({url}) {
    return (
        <HStack>
            <FacebookShareButton url={url}>
                <Icon  _hover={{
          transform: "translateY(-10%)"
        }} transition="all 0.3s ease-in-out" as={RiFacebookBoxFill} fontSize="20" color="blue.400"/>
            </FacebookShareButton>

            <WhatsappShareButton url={url}>
                <Icon  _hover={{
          transform: "translateY(-10%)"
        }} transition="all 0.3s ease-in-out" as={RiWhatsappFill} fontSize="20" color="green.400"/>
            </WhatsappShareButton>

            <TelegramShareButton url={url}>
                <Icon  _hover={{
          transform: "translateY(-10%)"
        }} transition="all 0.3s ease-in-out" as={SiTelegram} fontSize="18" color="blue.200"/>
            </TelegramShareButton>

            <TwitterShareButton url={url}>
                <Icon  _hover={{
          transform: "translateY(-10%)"
        }} transition="all 0.3s ease-in-out" as={SiTwitter} fontSize="18" color="blue.600"/>
            </TwitterShareButton>
        </HStack>
    )

  }