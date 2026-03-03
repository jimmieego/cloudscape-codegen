import Box from '@cloudscape-design/components/box'
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group'
import Button from '@cloudscape-design/components/button'
import Container from '@cloudscape-design/components/container'
import ContentLayout from '@cloudscape-design/components/content-layout'
import Header from '@cloudscape-design/components/header'
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs'
import SpaceBetween from '@cloudscape-design/components/space-between'
import StatusIndicator from '@cloudscape-design/components/status-indicator'
import Table from '@cloudscape-design/components/table'

type ReaderNode = {
  id: string
  az: string
  instanceClass: string
  status: 'available' | 'modifying'
}

type EventRecord = {
  time: string
  type: string
  message: string
}

type Tag = {
  key: string
  value: string
}

const CLUSTER = {
  identifier: 'prod-analytics-cluster-1',
  engine: 'Aurora PostgreSQL 15',
  region: 'us-east-1',
  arn: 'arn:aws:rds:us-east-1:123456789012:cluster:prod-analytics-cluster-1',
  writerEndpoint: 'prod-analytics.cluster-abc123.us-east-1.rds.amazonaws.com',
  readers: 2,
  status: 'Available',
  encryption: 'AWS owned key',
  backupWindow: '03:00 - 03:30 UTC',
  maintenanceWindow: 'sun:05:00-sun:05:30',
  logExports: 'postgresql, upgrade',
}

const READER_NODES: ReaderNode[] = [
  { id: 'prod-analytics-ro-1', az: 'us-east-1a', instanceClass: 'db.r6g.large', status: 'available' },
  { id: 'prod-analytics-ro-2', az: 'us-east-1b', instanceClass: 'db.r6g.large', status: 'modifying' },
]

const EVENTS: EventRecord[] = [
  {
    time: '2026-03-02 11:42 UTC',
    type: 'maintenance',
    message: 'Minor version upgrade scheduled for maintenance window.',
  },
  {
    time: '2026-03-01 23:18 UTC',
    type: 'availability',
    message: 'Reader instance failover test completed successfully.',
  },
]

const TAGS: Tag[] = [
  { key: 'environment', value: 'production' },
  { key: 'owner', value: 'team-data-platform' },
  { key: 'cost-center', value: 'finops-ml' },
]

export default function ClusterDetailsPage() {
  return (
    <ContentLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Databases', href: '#' },
            { text: 'Clusters', href: '#' },
            { text: CLUSTER.identifier, href: '#' },
          ]}
        />
      }
      header={
        <Header
          variant="h1"
          description="Operational metadata, health status, and related resources for this database cluster."
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>Edit</Button>
              <Button variant="primary">Delete</Button>
            </SpaceBetween>
          }
        >
          {CLUSTER.identifier}
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">Cluster settings</Header>}>
          <KeyValuePairs
            columns={4}
            items={[
              {
                type: 'group',
                items: [
                  { label: 'Identifier', value: CLUSTER.identifier },
                  { label: 'Engine', value: CLUSTER.engine },
                  { label: 'Region', value: CLUSTER.region },
                ],
              },
              {
                type: 'group',
                items: [
                  { label: 'Status', value: <StatusIndicator type="success">{CLUSTER.status}</StatusIndicator> },
                  { label: 'Reader nodes', value: CLUSTER.readers },
                  { label: 'Writer endpoint', value: CLUSTER.writerEndpoint },
                ],
              },
              {
                type: 'group',
                items: [
                  { label: 'Backup window', value: CLUSTER.backupWindow },
                  { label: 'Maintenance window', value: CLUSTER.maintenanceWindow },
                  { label: 'Encryption', value: CLUSTER.encryption },
                ],
              },
              {
                type: 'group',
                items: [
                  { label: 'ARN', value: CLUSTER.arn },
                  { label: 'Log exports', value: CLUSTER.logExports },
                  { label: 'Performance insights', value: 'Enabled' },
                ],
              },
            ]}
          />
        </Container>

        <Container
          header={
            <Header variant="h2" counter={`(${READER_NODES.length})`}>
              Reader instances
            </Header>
          }
        >
          <Table<ReaderNode>
            variant="borderless"
            items={READER_NODES}
            columnDefinitions={[
              { id: 'id', header: 'Instance ID', cell: item => item.id, isRowHeader: true },
              { id: 'az', header: 'Availability zone', cell: item => item.az },
              { id: 'class', header: 'Instance class', cell: item => item.instanceClass },
              {
                id: 'status',
                header: 'Status',
                cell: item => (
                  <StatusIndicator type={item.status === 'available' ? 'success' : 'in-progress'}>
                    {item.status}
                  </StatusIndicator>
                ),
              },
            ]}
            empty={<Box textAlign="center">No reader instances</Box>}
          />
        </Container>

        <Container header={<Header variant="h2">Recent events</Header>}>
          <Table<EventRecord>
            variant="borderless"
            items={EVENTS}
            columnDefinitions={[
              { id: 'time', header: 'Time', cell: item => item.time, isRowHeader: true },
              { id: 'type', header: 'Type', cell: item => item.type },
              { id: 'message', header: 'Message', cell: item => item.message },
            ]}
            empty={<Box textAlign="center">No recent events</Box>}
          />
        </Container>

        <Container header={<Header variant="h2">Tags</Header>}>
          <Table<Tag>
            variant="borderless"
            items={TAGS}
            columnDefinitions={[
              { id: 'key', header: 'Key', cell: item => item.key, isRowHeader: true },
              { id: 'value', header: 'Value', cell: item => item.value },
            ]}
            empty={<Box textAlign="center">No tags</Box>}
          />
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
