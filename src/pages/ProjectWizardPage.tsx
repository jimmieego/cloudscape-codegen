import { useMemo, useState } from 'react'
import Box from '@cloudscape-design/components/box'
import Container from '@cloudscape-design/components/container'
import ContentLayout from '@cloudscape-design/components/content-layout'
import Flashbar from '@cloudscape-design/components/flashbar'
import FormField from '@cloudscape-design/components/form-field'
import Header from '@cloudscape-design/components/header'
import Input from '@cloudscape-design/components/input'
import Multiselect from '@cloudscape-design/components/multiselect'
import SpaceBetween from '@cloudscape-design/components/space-between'
import Wizard from '@cloudscape-design/components/wizard'

type Option = { label: string; value: string }

const PERMISSION_OPTIONS: Option[] = [
  { label: 'Read resources', value: 'read' },
  { label: 'Write resources', value: 'write' },
  { label: 'Delete resources', value: 'delete' },
  { label: 'Manage IAM roles', value: 'iam' },
]

export default function ProjectWizardPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [policyName, setPolicyName] = useState('')
  const [principal, setPrincipal] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<ReadonlyArray<Option>>([])
  const [submitted, setSubmitted] = useState(false)

  const detailsError = useMemo(() => {
    if (!policyName.trim() || !principal.trim()) {
      return 'Policy name and principal are required before moving forward.'
    }
    return undefined
  }, [policyName, principal])

  const permissionsError = useMemo(() => {
    if (selectedPermissions.length === 0) {
      return 'Choose at least one permission.'
    }
    return undefined
  }, [selectedPermissions])

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Guided flow for creating an API key policy with review and confirmation."
        >
          API Key Policy Wizard
        </Header>
      }
    >
      <SpaceBetween size="l">
        {submitted && (
          <Flashbar
            items={[
              {
                id: 'policy-created',
                type: 'success',
                content: `Policy ${policyName} is ready for API submission.`,
                dismissible: true,
              },
            ]}
          />
        )}

        <Wizard
          activeStepIndex={activeStepIndex}
          onNavigate={({ detail }) => setActiveStepIndex(detail.requestedStepIndex)}
          onCancel={() => {
            setActiveStepIndex(0)
            setSubmitted(false)
          }}
          onSubmit={() => setSubmitted(true)}
          submitButtonText="Create policy"
          i18nStrings={{
            stepNumberLabel: (stepNumber) => `Step ${stepNumber}`,
            collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
            navigationAriaLabel: 'Steps',
            cancelButton: 'Cancel',
            previousButton: 'Previous',
            nextButton: 'Next',
            optional: 'optional',
            nextButtonLoadingAnnouncement: 'Loading next step',
            submitButtonLoadingAnnouncement: 'Submitting wizard',
          }}
          steps={[
            {
              title: 'Details',
              errorText: detailsError,
              content: (
                <Container>
                  <SpaceBetween size="m">
                    <FormField label="Policy name" description="Unique name used by operators.">
                      <Input
                        value={policyName}
                        placeholder="api-key-project-admin"
                        onChange={({ detail }) => setPolicyName(detail.value)}
                      />
                    </FormField>
                    <FormField
                      label="Principal"
                      description="Role, service account, or user that will receive this policy."
                    >
                      <Input
                        value={principal}
                        placeholder="role/project-admin"
                        onChange={({ detail }) => setPrincipal(detail.value)}
                      />
                    </FormField>
                  </SpaceBetween>
                </Container>
              ),
            },
            {
              title: 'Permissions',
              errorText: permissionsError,
              content: (
                <Container>
                  <FormField
                    label="Allowed actions"
                    description="Select the actions this principal can perform with API keys."
                  >
                    <Multiselect
                      selectedOptions={selectedPermissions}
                      onChange={({ detail }) => setSelectedPermissions(detail.selectedOptions as Option[])}
                      options={PERMISSION_OPTIONS}
                      placeholder="Choose permissions"
                    />
                  </FormField>
                </Container>
              ),
            },
            {
              title: 'Review',
              content: (
                <Container>
                  <SpaceBetween size="s">
                    <Box variant="awsui-key-label">Policy name</Box>
                    <Box>{policyName || '-'}</Box>
                    <Box variant="awsui-key-label">Principal</Box>
                    <Box>{principal || '-'}</Box>
                    <Box variant="awsui-key-label">Permissions</Box>
                    <Box>
                      {selectedPermissions.length > 0
                        ? selectedPermissions.map((permission) => permission.label).join(', ')
                        : '-'}
                    </Box>
                  </SpaceBetween>
                </Container>
              ),
            },
            {
              title: 'Confirmation',
              content: (
                <Container>
                  <Box>
                    Select <b>Create policy</b> to finalize this workflow and continue with backend integration.
                  </Box>
                </Container>
              ),
            },
          ]}
        />
      </SpaceBetween>
    </ContentLayout>
  )
}
