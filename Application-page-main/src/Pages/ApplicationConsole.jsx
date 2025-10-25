import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Header, 
  SpaceBetween, 
  Container, 
  Alert,
  Spinner,
  Badge,
  TextFilter,
  Pagination,
  ButtonDropdown,
  Box
} from '@cloudscape-design/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mockAPI } from '../data/Mock';

const ApplicationConsole = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  
  const applicationType = searchParams.get('type') || 'organization';
  const pageSize = 10;

  useEffect(() => {
    loadApplications();
  }, [applicationType]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (applicationType === 'organization') {
        response = await mockAPI.getOrganizationApplications();
      } else {
        response = await mockAPI.getEventApplications();
      }
      
      setApplications(response.data);
      setPagesCount(Math.ceil(response.total / pageSize));
    } catch (err) {
      setError('Failed to load applications');
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplication = (applicationId) => {
    navigate(`/applications/${applicationId}?type=${applicationType}`);
  };

  const handleTypeChange = (newType) => {
    setSearchParams({ type: newType });
    setSelectedItems([]);
    setFilterText('');
    setCurrentPageIndex(1);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'blue', text: 'Pending' },
      approved: { color: 'green', text: 'Approved' },
      rejected: { color: 'red', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: 'grey', text: status };
    return <Badge color={config.color}>{config.text}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const columns = [
    {
      id: 'id',
      header: 'Application ID',
      cell: item => (
        <Button 
          variant="link" 
          onClick={() => handleViewApplication(item.id)}
        >
          {item.id}
        </Button>
      ),
      sortingField: 'id'
    },
    {
      id: 'name',
      header: 'Name',
      cell: item => item.name,
      sortingField: 'name'
    },
    {
      id: 'applicantName',
      header: 'Applicant',
      cell: item => item.applicantName,
      sortingField: 'applicantName'
    },
    {
      id: 'status',
      header: 'Status',
      cell: item => getStatusBadge(item.status),
      sortingField: 'status'
    },
    {
      id: 'submittedAt',
      header: 'Submitted',
      cell: item => formatDate(item.submittedAt),
      sortingField: 'submittedAt'
    },
    {
      id: 'budget',
      header: 'Budget',
      cell: item => item.formResponse?.budget ? `₹${item.formResponse.budget.toLocaleString()}` : '-',
      sortingField: 'budget'
    },
    {
      id: 'files',
      header: 'Files',
      cell: item => item.files?.length || 0,
      sortingField: 'files'
    }
  ];

  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(filterText.toLowerCase()) ||
    app.applicantName.toLowerCase().includes(filterText.toLowerCase()) ||
    app.id.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedApplications = filteredApplications.slice(
    (currentPageIndex - 1) * pageSize,
    currentPageIndex * pageSize
  );

  if (loading) {
    return (
      <Container>
        <Box textAlign="center" padding="xxl">
          <Spinner size="large" />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <SpaceBetween direction="vertical" size="l">
        <Header
          variant="h1"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <ButtonDropdown
                items={[
                  { text: 'Organization Applications', id: 'organization' },
                  { text: 'Event Applications', id: 'event' }
                ]}
                onItemClick={({ detail }) => handleTypeChange(detail.id)}
              >
                Switch to {applicationType === 'organization' ? 'Event' : 'Organization'} Applications
              </ButtonDropdown>
              <Button
                variant="primary"
                disabled={selectedItems.length === 0}
                onClick={() => handleViewApplication(selectedItems[0].id)}
              >
                View Selected
              </Button>
            </SpaceBetween>
          }
        >
          {applicationType === 'organization' ? 'Organization' : 'Event'} Applications
        </Header>

        {error && (
          <Alert type="error" dismissible onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Table
          columnDefinitions={columns}
          items={paginatedApplications}
          selectionType="single"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
          filter={
            <TextFilter
              filteringText={filterText}
              onChange={({ detail }) => setFilterText(detail.filteringText)}
              filteringPlaceholder="Search applications..."
            />
          }
          pagination={
            <Pagination
              currentPageIndex={currentPageIndex}
              pagesCount={pagesCount}
              onPreviousPageClick={() => setCurrentPageIndex(currentPageIndex - 1)}
              onNextPageClick={() => setCurrentPageIndex(currentPageIndex + 1)}
              onPageChange={({ detail }) => setCurrentPageIndex(detail.requestedPageIndex)}
            />
          }
          empty={
            <Box textAlign="center" color="inherit">
              <b>No applications found</b>
              <Box variant="p" color="inherit">
                No applications match your search criteria.
              </Box>
            </Box>
          }
          header={
            <Header
              counter={`(${filteredApplications.length})`}
              actions={
                <Button
                  variant="primary"
                  disabled={selectedItems.length === 0}
                  onClick={() => handleViewApplication(selectedItems[0].id)}
                >
                  View Selected
                </Button>
              }
            >
              Applications
            </Header>
          }
        />
      </SpaceBetween>
    </Container>
  );
};

export default ApplicationConsole;
