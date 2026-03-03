import { useState } from 'react'
import Alert from '@cloudscape-design/components/alert'
import AttributeEditor from '@cloudscape-design/components/attribute-editor'
import Button from '@cloudscape-design/components/button'
import Container from '@cloudscape-design/components/container'
import ContentLayout from '@cloudscape-design/components/content-layout'
import Flashbar from '@cloudscape-design/components/flashbar'
import Form from '@cloudscape-design/components/form'
import FormField from '@cloudscape-design/components/form-field'
import Header from '@cloudscape-design/components/header'
import Input from '@cloudscape-design/components/input'
import Select from '@cloudscape-design/components/select'
import SpaceBetween from '@cloudscape-design/components/space-between'
import Textarea from '@cloudscape-design/components/textarea'

type Option = { label: string; value: string }
type TagPair = { key: string; value: string }

type FormErrors = {
  name?: string
  owner?: string
  environment?: string
}

const ENV_OPTIONS: Option[] = [
  { label: 'Development', value: 'dev' },
  { label: 'Staging', value: 'staging' },
  { label: 'Production', value: 'prod' },
]

export default function ProjectFormPage() {
  const fieldWidthStyle = { width: '65%', maxWidth: '65%', minWidth: 0 }

  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [environment, setEnvironment] = useState<Option | null>(null)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<TagPair[]>([{ key: '', value: '' }])
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!name.trim()) nextErrors.name = 'Project name is required.'
    if (!owner.trim()) nextErrors.owner = 'Owner is required.'
    if (!environment) nextErrors.environment = 'Select an environment.'

    return nextErrors
  }

  const handleSubmit = () => {
    const nextErrors = validate()
    setErrors(nextErrors)
    setSubmitError(null)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  const handleCancel = () => {
    setName('')
    setOwner('')
    setEnvironment(null)
    setDescription('')
    setTags([{ key: '', value: '' }])
    setErrors({})
    setSubmitError(null)
    setSubmitted(false)
  }

  return (
    <ContentLayout
      header={
        <Header variant="h1" description="Create a new project with validation and typed form state.">
          New Project
        </Header>
      }
    >
      <SpaceBetween size="l">
        {submitted && (
          <Flashbar
            items={[
              {
                type: 'success',
                dismissible: true,
                content: `Project ${name} is ready to be submitted to your backend with ${tags.filter((tag) => tag.key.trim() && tag.value.trim()).length} tag entries.`,
                id: 'project-created',
              },
            ]}
          />
        )}

        {submitError && (
          <Alert type="error" header="Could not submit form">
            {submitError}
          </Alert>
        )}

        <Container>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Create project
                </Button>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              <div style={fieldWidthStyle}>
                <FormField label="Project name" errorText={errors.name} stretch>
                  <Input
                    value={name}
                    onChange={({ detail }) => setName(detail.value)}
                    invalid={Boolean(errors.name)}
                    placeholder="billing-service"
                    inputMode="text"
                  />
                </FormField>
              </div>

              <div style={fieldWidthStyle}>
                <FormField label="Owner" errorText={errors.owner} stretch>
                  <Input
                    value={owner}
                    onChange={({ detail }) => setOwner(detail.value)}
                    invalid={Boolean(errors.owner)}
                    placeholder="team-platform"
                    inputMode="text"
                  />
                </FormField>
              </div>

              <div style={fieldWidthStyle}>
                <FormField
                  label="Environment"
                  description="Select the environment this project is primarily targeting."
                  errorText={errors.environment}
                  stretch
                >
                  <Select
                    selectedOption={environment}
                    onChange={({ detail }) => setEnvironment(detail.selectedOption as Option)}
                    options={ENV_OPTIONS}
                    placeholder="Choose environment"
                    invalid={Boolean(errors.environment)}
                  />
                </FormField>
              </div>

              <div style={fieldWidthStyle}>
                <FormField
                  label="Tags"
                  description="Define key/value metadata entries for the project."
                  stretch
                >
                  <AttributeEditor<TagPair>
                    items={tags}
                    addButtonText="Add new tag"
                    removeButtonText="Remove"
                    empty="No tags configured"
                    definition={[
                      {
                        label: 'Key',
                        control: (item, index) => (
                          <Input
                            value={item.key}
                            placeholder="cost-center"
                            onChange={({ detail }) => {
                              setTags((prev) =>
                                prev.map((tag, rowIndex) =>
                                  rowIndex === index ? { ...tag, key: detail.value } : tag,
                                ),
                              )
                            }}
                          />
                        ),
                      },
                      {
                        label: 'Value',
                        control: (item, index) => (
                          <Input
                            value={item.value}
                            placeholder="finops"
                            onChange={({ detail }) => {
                              setTags((prev) =>
                                prev.map((tag, rowIndex) =>
                                  rowIndex === index ? { ...tag, value: detail.value } : tag,
                                ),
                              )
                            }}
                          />
                        ),
                      },
                    ]}
                    onAddButtonClick={() => setTags((prev) => [...prev, { key: '', value: '' }])}
                    onRemoveButtonClick={({ detail }) =>
                      setTags((prev) => prev.filter((_, index) => index !== detail.itemIndex))
                    }
                  />
                </FormField>
              </div>

              <div style={fieldWidthStyle}>
                <FormField
                  label="Description"
                  description="Describe business purpose, owners, and operational notes."
                  stretch
                >
                  <Textarea
                    value={description}
                    onChange={({ detail }) => setDescription(detail.value)}
                    placeholder="Service that handles customer invoice aggregation and reporting."
                    rows={5}
                  />
                </FormField>
              </div>
            </SpaceBetween>
          </Form>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
