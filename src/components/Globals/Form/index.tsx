"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon"

const GET_FORM_BY_ID = gql`
  query GetForm($id: ID!) {
    forminatorForm(id: $id) {
      id
      title
      fields {
        id
        type
        label
        placeholder
        required
        options
      }
    }
  }
`;

const SUBMIT_FORM = gql`
  mutation SubmitForm($input: SubmitForminatorFormInput!) {
    submitForminatorForm(input: $input) {
      success
      message
      entryId
    }
  }
`;

type FormField = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
};

export default function Form({ formId }: { formId: string }) {
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { loading, error, data } = useQuery(GET_FORM_BY_ID, {
    variables: { id: formId },
  });

  const [submitForm, { data: submitResult, loading: submitting, error: submitError }] =
    useMutation(SUBMIT_FORM);

  const form = data?.forminatorForm;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (fieldId: string, value: string, isChecked: boolean) => {
    setFormData(prev => {
      const currentValues = Array.isArray(prev[fieldId])
        ? [...(prev[fieldId] as string[])]
        : [];

      if (isChecked) {
        return { ...prev, [fieldId]: [...currentValues, value] };
      } else {
        return {
          ...prev,
          [fieldId]: currentValues.filter(v => v !== value)
        };
      }
    });
  };

  const validateForm = (fields: FormField[]) => {
    const errors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.label} is required`;
        isValid = false;
      }

      // Email validation
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id] as string)) {
          errors[field.id] = 'Please enter a valid email address';
          isValid = false;
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form) return;

    if (!validateForm(form.fields)) {
      return;
    }

    const fieldsToSubmit = form.fields
      .filter((field: any) => field.type !== "submit")
      .map((field: any) => ({
        id: field.id,
        value: Array.isArray(formData[field.id])
          ? (formData[field.id] as string[]).join(', ')
          : (formData[field.id] as string) || '',
      }));

    try {
      const result = await submitForm({
        variables: {
          input: {
            formId: form.id,
            fields: fieldsToSubmit,
          },
        },
      });

      if (result.data?.submitForminatorForm?.success) {
        alert("اطلاعات شما با موفقیت ثبت شد.");
        setFormData({});
      } else {
        alert("Submission failed: " + result.data?.submitForminatorForm?.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An unexpected error occurred.");
    }
  };

  if (loading) return <div className="text-center py-8">Loading form...</div>;
  if (error) return <div className="text-red-500 p-4">Error loading form: {error.message}</div>;
  if (!form) return <div className="text-center py-8">Form not found.</div>;

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      name: field.id,
      value: formData[field.id] || '',
      onChange: handleChange,
      required: field.required,
      className: `w-full border ${formErrors[field.id] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'text':
      case 'textbox':
      case 'name':
        return <input type="text" {...commonProps} />;

      case 'email':
        return <input type="email" {...commonProps} />;

      case 'number':
        return <input type="number" {...commonProps} />;

      case 'date':
        return (
          <div className="space-y-2">
            <DatePicker
              required={field.required}
              calendar={persian}
              locale={persian_fa}
              render={<InputIcon style={{ padding: '.5rem .75rem', minHeight: '52px' }} />}
              onChange={(date) => {
                setFormData((prev) => ({
                  ...prev,
                  [field.id]: date?.toString() || '',
                }));
                setFormErrors((prev) => ({
                  ...prev,
                  [field.id]: '',
                }));
              }}
            />
          </div>
        );

      case 'textarea':
        return <textarea {...commonProps} rows={4} />;

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">{field.placeholder}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            <label className="block text-sm text-slate-800">{field.label}</label>
            {field.options?.map(option => (
              <label key={option} className="inline-flex items-center space-x-4">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 me-1"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        // For single checkbox
        if (!field.options || field.options.length === 1) {
          return (
            <>
              <label className="block text-sm text-slate-800">{field.label}</label>
              <label className="inline-flex items-center space-x-4">
                <input
                  type="checkbox"
                  name={field.id}
                  checked={!!formData[field.id]}
                  onChange={(e) => handleChange(e)}
                  className="h-4 w-4 text-blue-600 me-1"
                />
                <span>{field.options?.[0] || field.label}</span>
              </label>
            </>
          );
        }
        // For multiple checkboxes
        return (
          <div className="space-y-2">
            <label className="block text-sm text-slate-800">{field.label}</label>
            {field.options?.map(option => (
              <label key={option} className="inline-flex items-center space-x-4">
                <input
                  type="checkbox"
                  name={`${field.id}-${option}`}
                  value={option}
                  checked={Array.isArray(formData[field.id])
                    ? (formData[field.id] as string[]).includes(option)
                    : false}
                  onChange={(e) => handleCheckboxChange(field.id, option, e.target.checked)}
                  className="h-4 w-4 text-blue-600 me-1"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <p className="text-gray-500">Unsupported field type: {field.type}</p>;
    }
  };

  return (
    <div className="mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {
            decodeURIComponent(form.title).replace(/-/g, ' ')
          }
        </h1>

        {form.fields.map((field: FormField) => (
          <div key={field.id} className="space-y-1">
            {field.type !== 'checkbox' && field.type !== 'radio' && (
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
            )}

            {renderField(field)}

            {formErrors[field.id] && (
              <p className="text-red-500 text-sm">{formErrors[field.id]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              در حال ارسال...
            </span>
          ) : (
            'ثبت اطلاعات'
          )}
        </button>

        {submitError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md">
            Error: {submitError.message}
          </div>
        )}

        {submitResult?.submitForminatorForm?.message && !submitResult.submitForminatorForm.success && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md">
            {submitResult.submitForminatorForm.message}
          </div>
        )}
      </form>
    </div>
  );
}