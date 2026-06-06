import { useRef, useState } from 'react'
import { getApiError } from '../services/api'
import { createFood } from '../services/foodService'
import Alert from './Alert'

const initialValues = {
  name: '',
  description: '',
  video: null,
}

function FoodForm({ onCreated }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const validate = () => {
    const nextErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Food name is required.'
    }

    if (values.name.trim() && values.name.trim().length < 2) {
      nextErrors.name = 'Food name must be at least 2 characters.'
    }

    if (!values.description.trim()) {
      nextErrors.description = 'Description is required.'
    }

    if (values.description.trim() && values.description.trim().length < 8) {
      nextErrors.description = 'Description must be at least 8 characters.'
    }

    if (!values.video) {
      nextErrors.video = 'A food video is required.'
    }

    if (values.video && !values.video.type.startsWith('video/')) {
      nextErrors.video = 'Please upload a valid video file.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleTextChange = (event) => {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setValues((currentValues) => ({ ...currentValues, video: file }))
    setErrors((currentErrors) => ({ ...currentErrors, video: '' }))
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setSubmitError('')

    if (!validate()) {
      return
    }

    const formData = new FormData()
    formData.append('name', values.name.trim())
    formData.append('description', values.description.trim())
    formData.append('video', values.video)

    setIsSubmitting(true)

    try {
      const data = await createFood(formData)
      setMessage(data.message || 'Food created successfully.')
      resetForm()

      if (data.food && onCreated) {
        onCreated(data.food)
      }
    } catch (error) {
      setSubmitError(getApiError(error, 'Unable to create food.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <Alert message={message} type="success" />
      <Alert message={submitError} type="error" />

      <label className="field">
        <span>Name</span>
        <input
          name="name"
          type="text"
          value={values.name}
          onChange={handleTextChange}
          placeholder="Paneer tikka bowl"
          autoComplete="off"
        />
        {errors.name ? <small>{errors.name}</small> : null}
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          name="description"
          value={values.description}
          onChange={handleTextChange}
          placeholder="Smoky, creamy, and ready for late-night cravings."
          rows="5"
        />
        {errors.description ? <small>{errors.description}</small> : null}
      </label>

      <label className="field file-field">
        <span>Video</span>
        <input ref={fileInputRef} name="video" type="file" accept="video/*" onChange={handleFileChange} />
        <strong>{values.video ? values.video.name : 'Choose a food video'}</strong>
        {errors.video ? <small>{errors.video}</small> : null}
      </label>

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Uploading...' : 'Create food'}
      </button>
    </form>
  )
}

export default FoodForm
