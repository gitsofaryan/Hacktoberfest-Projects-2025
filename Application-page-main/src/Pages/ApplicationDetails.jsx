import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  SpaceBetween,
  Button,
  Alert,
  Spinner,
  Badge,
  Box,
  ColumnLayout,
  FormField,
  Textarea,
  Input,
  Table,
  ButtonDropdown,
  Modal,
  StatusIndicator,
  Tabs,
  Link
} from '@cloudscape-design/components';
import { mockAPI } from '../data/Mock';

export default function ApplicationDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const applicationType = searchParams.get('type') || 'organization';
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [status, setStatus] = useState("");
  const [statusComment, setStatusComment] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusAction, setStatusAction] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    loadApplication();
  }, [id]);

  const loadApplication = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockAPI.getApplicationById(id);
      setApplication(response.data);
      setStatus(response.data.status);
      setComments(response.data.comments || []);
    } catch (err) {
      setError('Failed to load application details');
      console.error('Error loading application:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    
    try {
      await mockAPI.addComment(id, newComment);
      const newCommentObj = {
        id: `comment-${Date.now()}`,
        text: newComment,
        author: "Current User",
        timestamp: new Date().toISOString()
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleStatusChange = (action) => {
    setStatusAction(action);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    try {
      await mockAPI.updateApplicationStatus(id, statusAction, statusComment);
      setStatus(statusAction);
      setShowStatusModal(false);
      setStatusComment("");
      
      // Add status change comment
      const statusCommentObj = {
        id: `comment-${Date.now()}`,
        text: `Status changed to ${statusAction}${statusComment ? `: ${statusComment}` : ''}`,
        author: "System",
        timestamp: new Date().toISOString()
      };
      setComments([...comments, statusCommentObj]);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await mockAPI.uploadFile(id, file);
      
      const newFile = {
        id: response.fileId,
        name: response.fileName,
        size: response.fileSize,
        uploadedAt: new Date().toISOString(),
        type: file.type
      };
      
      setApplication(prev => ({
        ...prev,
        files: [...(prev.files || []), newFile]
      }));
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileDownload = async (fileId, fileName) => {
    try {
      await mockAPI.downloadFile(fileId);
      // In a real app, this would trigger the actual download
      alert(`Downloading ${fileName}...`);
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'blue', text: 'Pending' },
      approved: { color: 'green', text: 'Approved' },
      rejected: { color: 'red', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: 'grey', text: status };
    return <Badge color={config.color}>{config.text}</Badge>;
  };

  const renderFormResponse = () => {
    if (!application?.formResponse) return null;

    const formData = application.formResponse;
    const entries = Object.entries(formData);

    return (
      <ColumnLayout columns={2} variant="text-grid">
        {entries.map(([key, value]) => (
          <div key={key}>
            <Box variant="awsui-key-label">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Box>
            <Box variant="p" color="text-body-secondary">
              {Array.isArray(value) ? value.join(', ') : String(value)}
            </Box>
          </div>
        ))}
      </ColumnLayout>
    );
  };

  const fileColumns = [
    {
      id: 'name',
      header: 'File Name',
      cell: item => (
        <Link onFollow={() => handleFileDownload(item.id, item.name)}>
          {item.name}
        </Link>
      )
    },
    {
      id: 'size',
      header: 'Size',
      cell: item => formatFileSize(item.size)
    },
    {
      id: 'uploadedAt',
      header: 'Uploaded',
      cell: item => formatDate(item.uploadedAt)
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: item => (
        <Button
          variant="link"
          onClick={() => handleFileDownload(item.id, item.name)}
        >
          Download
        </Button>
      )
    }
  ];

  if (loading) {
    return (
      <Container>
        <Box textAlign="center" padding="xxl">
          <Spinner size="large" />
        </Box>
      </Container>
    );
  }

  if (error || !application) {
    return (
      <Container>
        <Alert type="error">
          {error || 'Application not found'}
        </Alert>
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
              <Button
                variant="normal"
                onClick={() => navigate(`/?type=${applicationType}`)}
              >
                Back to Applications
              </Button>
              <ButtonDropdown
                items={[
                  { text: 'Approve Application', id: 'approved' },
                  { text: 'Reject Application', id: 'rejected' }
                ]}
                onItemClick={({ detail }) => handleStatusChange(detail.id)}
                disabled={status !== 'pending'}
              >
                Change Status
              </ButtonDropdown>
            </SpaceBetween>
          }
        >
          Application Details - {application.name}
        </Header>

        <Tabs
          activeTabId={activeTab}
          onChange={({ detail }) => setActiveTab(detail.activeTabId)}
          tabs={[
            {
              label: 'Details',
              id: 'details',
              content: (
                <SpaceBetween direction="vertical" size="l">
                  <Container header={<Header>Application Information</Header>}>
                    <ColumnLayout columns={3} variant="text-grid">
                      <div>
                        <Box variant="awsui-key-label">Application ID</Box>
                        <Box variant="p" color="text-body-secondary">{application.id}</Box>
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Type</Box>
                        <Box variant="p" color="text-body-secondary">
                          {application.type === 'organization' ? 'Organization' : 'Event'}
                        </Box>
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Status</Box>
                        <Box variant="p" color="text-body-secondary">
                          {getStatusBadge(status)}
                        </Box>
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Applicant Name</Box>
                        <Box variant="p" color="text-body-secondary">{application.applicantName}</Box>
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Email</Box>
                        <Box variant="p" color="text-body-secondary">{application.applicantEmail}</Box>
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Submitted At</Box>
                        <Box variant="p" color="text-body-secondary">{formatDate(application.submittedAt)}</Box>
                      </div>
                    </ColumnLayout>
                  </Container>

                  <Container header={<Header>Form Response</Header>}>
                    {renderFormResponse()}
                  </Container>
                </SpaceBetween>
              )
            },
            {
              label: 'Comments',
              id: 'comments',
              content: (
                <SpaceBetween direction="vertical" size="l">
                  <Container header={<Header>Comments ({comments.length})</Header>}>
                    <SpaceBetween direction="vertical" size="m">
                      {comments.map(comment => (
                        <Box
                          key={comment.id}
                          padding="m"
                          variant="div"
                          border="divider"
                          borderRadius="m"
                        >
                          <SpaceBetween direction="vertical" size="xs">
                            <Box variant="strong">{comment.author}</Box>
                            <Box variant="p" color="text-body-secondary">
                              {formatDate(comment.timestamp)}
                            </Box>
                            <Box variant="p">{comment.text}</Box>
                          </SpaceBetween>
                        </Box>
                      ))}
                    </SpaceBetween>
                  </Container>

                  <Container header={<Header>Add Comment</Header>}>
                    <SpaceBetween direction="vertical" size="m">
                      <FormField label="Comment">
                        <Textarea
                          value={newComment}
                          onChange={({ detail }) => setNewComment(detail.value)}
                          placeholder="Enter your comment..."
                          rows={3}
                        />
                      </FormField>
                      <Button
                        variant="primary"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                      >
                        Add Comment
                      </Button>
                    </SpaceBetween>
                  </Container>
                </SpaceBetween>
              )
            },
            {
              label: 'Files',
              id: 'files',
              content: (
                <SpaceBetween direction="vertical" size="l">
                  <Container header={<Header>Upload Files</Header>}>
                    <SpaceBetween direction="vertical" size="m">
                      <FormField label="Select File">
                        <Input
                          type="file"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                      </FormField>
                      {uploading && <Spinner size="normal" />}
                    </SpaceBetween>
                  </Container>

                  <Container header={<Header>Uploaded Files ({application.files?.length || 0})</Header>}>
                    {application.files && application.files.length > 0 ? (
                      <Table
                        columnDefinitions={fileColumns}
                        items={application.files}
                        empty={
                          <Box textAlign="center" color="inherit">
                            <b>No files uploaded</b>
                          </Box>
                        }
                      />
                    ) : (
                      <Box textAlign="center" color="inherit">
                        <b>No files uploaded</b>
                      </Box>
                    )}
                  </Container>
                </SpaceBetween>
              )
            }
          ]}
        />

        <Modal
          visible={showStatusModal}
          onDismiss={() => setShowStatusModal(false)}
          closeAriaLabel="Close modal"
          header={`${statusAction === 'approved' ? 'Approve' : 'Reject'} Application`}
        >
          <SpaceBetween direction="vertical" size="m">
            <FormField label="Reason (Optional)">
              <Textarea
                value={statusComment}
                onChange={({ detail }) => setStatusComment(detail.value)}
                placeholder="Enter reason for this action..."
                rows={3}
              />
            </FormField>
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="primary"
                onClick={confirmStatusChange}
                color={statusAction === 'approved' ? 'positive' : 'negative'}
              >
                {statusAction === 'approved' ? 'Approve' : 'Reject'} Application
              </Button>
              <Button
                variant="link"
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </Button>
            </SpaceBetween>
          </SpaceBetween>
        </Modal>
      </SpaceBetween>
    </Container>
  );
}

















































































































































































































































































































































































































































































































































