import React from 'react';
import Image from '../../components/Image.js';
import {
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useTheme,
  Heading,
  Link,
} from '@chakra-ui/core';

const CardContent = ({ title, blurb, publicId, cloudName }) => {
  const theme = useTheme();
  return (
    <>
      {publicId ? (
        <CardImage publicId={publicId} cloudName={cloudName} />
      ) : (
        <NoImage />
      )}
      <Flex
        w="100%"
        direction="column"
        p="4"
        align="center"
        justify="center"
        textAlign="center"
        backgroundColor="#001514"
      >
        <Heading
          color="white"
          fontFamily={theme.fonts.heading}
          as="h5"
          size="md"
        >
          {title}
        </Heading>
        <Text
          p="2"
          fontSize={theme.fontSizes.paragraph}
          fontFamily={theme.fonts.heading}
          color="#F7F7F2"
        >
          {blurb}
        </Text>
      </Flex>
    </>
  );
};

// @TODO :: Add a fallback image to be displayed incase of no image
const NoImage = () => (
  <Box maxW="342px" maxH="220px" bg="#414A4C">
    <Flex justify="center" align="center">
      <p>No image available</p>
    </Flex>
  </Box>
);

// @TODO :: Replace with new Image component
const CardImage = ({ publicId, cloudName }) => (
  <Flex w="100%" minH="220px" position="relative" overflow="hidden">
    <Image cloudName={cloudName} publicId={publicId} />
  </Flex>
);

// @TODO :: Add proper content to this modal. Probably pull this out into its own file seeing as its going to be a form
const ModalForm = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Some text here</ModalBody>
      <ModalFooter>
        <Button variantColor="blue" m={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const ModalCard = ({
  publicId,
  cloudName,
  modalTitle,
  title,
  blurb,
  margin,
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const focusRef = React.useRef();

  return (
    <>
      <Flex
        as="a"
        href="#"
        ref={focusRef}
        margin="5% auto"
        maxW={['279px', '342px']}
        maxH="322px"
        direction="column"
        onClick={onOpen}
        marginBottom={margin}
      >
        <CardContent
          title={title}
          blurb={blurb}
          publicId={publicId}
          cloudName={cloudName}
        />
      </Flex>
      <ModalForm isOpen={isOpen} title={modalTitle} onClose={onClose} />
    </>
  );
};

const MailtoCard = ({ publicId, cloudName, email, title, blurb }) => (
  <Flex
    as="a"
    href={`mailto:${email}`}
    isExternal
    margin="5% auto"
    maxW={['279px', '342px']}
    maxH="322px"
    direction="column"
  >
    <CardContent
      title={title}
      blurb={blurb}
      publicId={publicId}
      cloudName={cloudName}
    />
  </Flex>
);

const VolunteerCard = ({ publicId, cloudName, title, blurb }) => (
  <Flex
    as={Link}
    href="https://discord.com/invite/272XMuv"
    isExternal
    margin="5% auto"
    maxW={['279px', '342px']}
    maxH="322px"
    direction="column"
  >
    <CardContent
      title={title}
      blurb={blurb}
      publicId={publicId}
      cloudName={cloudName}
    />
  </Flex>
);

/**
 * Contact Card for Business Owner - General Inquiry - Volunteers. Default renders the VolunteerCard
 *
 * @param {string} title - The cards title
 * @param {string} blurb - The cards blurb
 * @param {string} publicId - The images url
 * @param {string} cloudName - The alt text for the image
 * @param {boolean} modalCard - If doesModal then card with modal will be displayed
 * @param {boolean} mailtoCard - If doesMailto then card with mailto link will be displayed
 * @param {string} modalTitle - The title to be displayed in the modal
 * @param {string} email - The RBB support email address
 */
const ContactCard = ({
  title,
  blurb,
  publicId,
  cloudName,
  modalCard,
  mailtoCard,
  modalTitle,
  email,
}) => {
  if (modalCard) {
    return (
      <ModalCard
        modalTitle={modalTitle}
        title={title}
        blurb={blurb}
        publicId={publicId}
        cloudName={cloudName}
      />
    );
  }
  if (mailtoCard) {
    return (
      <MailtoCard
        email={email}
        title={title}
        blurb={blurb}
        publicId={publicId}
        cloudName={cloudName}
      />
    );
  }
  return <VolunteerCard title={title} blurb={blurb} publicId={publicId} />;
};

export default ContactCard;
