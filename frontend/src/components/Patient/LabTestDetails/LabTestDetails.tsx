import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Container,
  Divider,
  List,
  ListItem,
  Button,
  Flex,
} from '@chakra-ui/react';
import PageContainer from '../../Shared/PageContainer/PageContainer';
import './LabTestDetails.scss';

const labTestDetails = {
  'complete-blood-count': {
    heading: 'Complete Blood Count (CBC)',
    description:
      'A comprehensive test to assess overall health and detect a wide range of disorders, including anemia and infections.',
    purpose:
      'Diagnoses infections, anemia, and other health conditions by analyzing blood components.',
    preparation: 'No special preparation required.',
    procedure: 'A small blood sample is drawn from a vein, typically in your arm.',
    normalRanges: [
      { parameter: 'Red Blood Cells (RBC)', range: '4.7 - 6.1 million/μL' },
      { parameter: 'White Blood Cells (WBC)', range: '4,500 - 11,000/μL' },
      { parameter: 'Platelets', range: '150,000 - 450,000/μL' },
    ],
    faq: [
      {
        question: 'How long does it take to get results?',
        answer: 'Results are usually available within 24 hours.',
      },
      {
        question: 'Is this test painful?',
        answer:
          'There may be a slight pinch during the blood draw, but it’s typically quick and painless.',
      },
    ],
  },
  // Add more test details as needed...
};

const LabTestDetails: React.FC = () => {
  const { testName } = useParams<{ testName: string }>();
  const normalizedTestName = testName
    ?.toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, '-');

  const testDetails =
    labTestDetails[normalizedTestName as keyof typeof labTestDetails];

  const navigate = useNavigate();

  const handleBookTest = () => {
    navigate('/book-test');
  };

  if (!testDetails) {
    return (
      <PageContainer>
        <Container maxW="800px" mt={10} textAlign="center">
          <Text fontSize="xl" color="red.500">
            Test not found. Please select a valid test.
          </Text>
          <Button
            mt={6}
            colorScheme="blue"
            onClick={() => navigate('/lab-tests')}
          >
            View All Lab Tests
          </Button>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxW="1280px" px={6} marginTop="75px" bg="#f9fafb">
        {/* Header Section */}
        <Box textAlign="center" mb={8} className="page-wrapper">
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            {testDetails.heading}
          </Text>
          <Text fontSize="lg" color="gray.500" mt={2}>
            {testDetails.description}
          </Text>
        </Box>

        <Divider mb={6} />

        {/* Purpose Section */}
        <DetailSection title="Purpose" content={testDetails.purpose} />

        {/* Preparation Section */}
        <DetailSection title="Preparation" content={testDetails.preparation} />

        {/* Procedure Section */}
        <DetailSection title="Procedure" content={testDetails.procedure} />

        {/* Normal Ranges Section */}
        <Box mb={8}>
          <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
            Normal Ranges
          </Text>
          <List spacing={3}>
            {testDetails.normalRanges.map((range, index) => (
              <ListItem key={index}>
                <Flex justify="space-between">
                  <Text color="gray.700">{range.parameter}</Text>
                  <Text color="gray.500">{range.range}</Text>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* FAQ Section */}
        <Box mb={8}>
          <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
            Frequently Asked Questions
          </Text>
          {testDetails.faq.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </Box>

        <Divider mb={6} />

        {/* Call to Action */}
        <Box textAlign="center">
          <Button colorScheme="green" size="lg" onClick={handleBookTest}>
            Book Test Now
          </Button>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default LabTestDetails;

/* Reusable Components */
interface DetailSectionProps {
  title: string;
  content: string;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, content }) => (
  <Box mb={8}>
    <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
      {title}
    </Text>
    <Text color="gray.600">{content}</Text>
  </Box>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <Box mb={4}>
    <Text fontWeight="bold" color="gray.700">
      Q: {question}
    </Text>
    <Text color="gray.600" mt={1}>
      A: {answer}
    </Text>
  </Box>
);
