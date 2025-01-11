import React, { useState } from 'react';
import {
  Box,
  Text,
  Container,
  Button,
  Input,
  Flex,
  VStack,
} from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Reports.scss';

const Reports: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Static reports data
  const staticReports = [
    { id: 1, name: 'Blood Test Report', date: '2025-01-01' },
    { id: 2, name: 'X-Ray Results', date: '2025-01-03' },
    { id: 3, name: 'MRI Scan Report', date: '2025-01-05' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  return (
    <PageContainer>
      <Box minH="100vh" pt="80px" className="reports-wrapper">
        <Container maxW="1280px" px={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Manage Your Reports
          </Text>

          {/* Upload Section */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            mb={8}
          >
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Upload New Reports
            </Text>
            <Flex>
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.png"
                sx={{ display: 'none' }}
                id="upload-input"
              />
              <label htmlFor="upload-input">
                <Button as="span" colorScheme="blue">
                  Choose Files
                </Button>
              </label>
            </Flex>
            {uploadedFiles.length > 0 && (
              <Box mt={4}>
                <Text fontSize="md" mb={2}>
                  Uploaded Files:
                </Text>
                <VStack align="start" spacing={2}>
                  {uploadedFiles.map((file, index) => (
                    <Text key={index}>{file.name}</Text>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>

          {/* Static Reports Section */}
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Your Reports
            </Text>
            <VStack align="start" spacing={4}>
              {staticReports.map((report) => (
                <Box
                  key={report.id}
                  p={4}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="gray.200"
                  width="100%"
                  _hover={{ bg: 'gray.50', cursor: 'pointer' }}
                >
                  <Flex justify="space-between">
                    <Text fontSize="md" fontWeight="medium">
                      {report.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {report.date}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default Reports;
