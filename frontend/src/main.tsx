import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import CreateFormPage from '@/pages/CreateForm'
import ListFormPage from '@/pages/ListForm'
import App from '@/App.tsx'
import { getFormById, getForms } from '@/services/form.ts'
import EditFormPage from './pages/EditForm'
import { fieldObjectToArray } from './lib/utils'
import ViewFormPage from './pages/ViewForm'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        loader: async () => {
          return { forms: await getForms() }
        },
        Component: ListFormPage,
      },
      { path: '/new', Component: CreateFormPage },
      {
        path: '/form/:formId',
        loader: async ({ params }) => {
          const { formId } = params
          if (formId) return { form: await getFormById(formId) }
        },
        Component: ViewFormPage,
      },
      {
        path: '/form/edit/:formId',
        loader: async ({ params }) => {
          const { formId } = params
          console.log(formId)
          if (formId) {
            const { id, name, fields } = await getFormById(formId)
            return {
              form: { id, name, fields },
            }
          }
        },
        Component: EditFormPage,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
