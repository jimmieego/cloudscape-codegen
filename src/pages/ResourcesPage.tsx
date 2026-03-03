import { useMemo, useState } from 'react'
import Alert from '@cloudscape-design/components/alert'
import Box from '@cloudscape-design/components/box'
import ButtonDropdown from '@cloudscape-design/components/button-dropdown'
import Container from '@cloudscape-design/components/container'
import ContentLayout from '@cloudscape-design/components/content-layout'
import Header from '@cloudscape-design/components/header'
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs'
import Pagination from '@cloudscape-design/components/pagination'
import SpaceBetween from '@cloudscape-design/components/space-between'
import StatusIndicator from '@cloudscape-design/components/status-indicator'
import Table from '@cloudscape-design/components/table'
import TextFilter from '@cloudscape-design/components/text-filter'

type Instance = {
  id: string
  name: string
  state: 'running' | 'stopped' | 'pending'
  type: string
  region: string
}

const PAGE_SIZE = 8

const MOCK_INSTANCES: Instance[] = [
  { id: 'i-01', name: 'api-prod-1', state: 'running', type: 't3.large', region: 'us-east-1' },
  { id: 'i-02', name: 'worker-prod-1', state: 'running', type: 't3.medium', region: 'us-east-1' },
  { id: 'i-03', name: 'batch-dev-1', state: 'stopped', type: 't3.small', region: 'us-west-2' },
  { id: 'i-04', name: 'etl-dev-2', state: 'pending', type: 'm6i.large', region: 'eu-west-1' },
  { id: 'i-05', name: 'api-stage-1', state: 'running', type: 't3.medium', region: 'us-east-2' },
  { id: 'i-06', name: 'batch-prod-2', state: 'running', type: 'm6i.xlarge', region: 'us-east-1' },
  { id: 'i-07', name: 'etl-prod-1', state: 'stopped', type: 'm6i.large', region: 'eu-central-1' },
  { id: 'i-08', name: 'web-dev-1', state: 'running', type: 't3.small', region: 'us-west-2' },
  { id: 'i-09', name: 'analytics-1', state: 'pending', type: 'r6i.large', region: 'us-east-1' },
  { id: 'i-10', name: 'worker-dev-3', state: 'stopped', type: 't3.micro', region: 'ap-southeast-1' },
]

export default function ResourcesPage() {
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [pageIndex, setPageIndex] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_INSTANCES
    return MOCK_INSTANCES.filter((i) =>
      [i.id, i.name, i.state, i.type, i.region].some((v) => v.toLowerCase().includes(q)),
    )
  }, [query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const clampedPage = Math.min(pageIndex, pageCount)
  const pageItems = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  const runningCount = filtered.filter((i) => i.state === 'running').length
  const stoppedCount = filtered.filter((i) => i.state === 'stopped').length

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Monitor compute resources, search quickly, and take row-level actions."
        >
          Resources
        </Header>
      }
    >
      <SpaceBetween size="l">
        {error && (
          <Alert type="error" header="Could not load instances">
            {error}
          </Alert>
        )}

        <Container header={<Header variant="h2">Instance summary</Header>}>
          <KeyValuePairs
            columns={3}
            items={[
              { label: 'Total', value: filtered.length },
              { label: 'Running', value: runningCount },
              { label: 'Stopped', value: stoppedCount },
            ]}
          />
        </Container>

        <Table<Instance>
          loading={loading}
          loadingText="Loading instances"
          header={<Header counter={`(${filtered.length})`}>Instances</Header>}
          items={pageItems}
          columnDefinitions={[
            { id: 'name', header: 'Name', cell: (item) => item.name, sortingField: 'name' },
            { id: 'id', header: 'Instance ID', cell: (item) => item.id },
            {
              id: 'state',
              header: 'State',
              cell: (item) => (
                <StatusIndicator
                  type={
                    item.state === 'running'
                      ? 'success'
                      : item.state === 'stopped'
                        ? 'stopped'
                        : 'in-progress'
                  }
                >
                  {item.state}
                </StatusIndicator>
              ),
            },
            { id: 'type', header: 'Type', cell: (item) => item.type },
            { id: 'region', header: 'Region', cell: (item) => item.region },
            {
              id: 'actions',
              header: 'Actions',
              cell: (item) => (
                <ButtonDropdown
                  ariaLabel={`Actions for ${item.name}`}
                  items={[
                    { id: 'view', text: 'View details' },
                    { id: 'restart', text: 'Restart' },
                    { id: 'stop', text: 'Stop' },
                  ]}
                  variant="inline-icon"
                />
              ),
            },
          ]}
          filter={
            <TextFilter
              filteringText={query}
              filteringPlaceholder="Find instances"
              onChange={({ detail }) => {
                setQuery(detail.filteringText)
                setPageIndex(1)
              }}
            />
          }
          pagination={
            <Pagination
              currentPageIndex={clampedPage}
              pagesCount={pageCount}
              onChange={({ detail }) => setPageIndex(detail.currentPageIndex)}
            />
          }
          empty={
            <Box textAlign="center" color="inherit">
              <b>No instances found</b>
              <Box variant="p" color="inherit">
                Try a different search term or clear filters.
              </Box>
            </Box>
          }
        />
      </SpaceBetween>
    </ContentLayout>
  )
}
