import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import authApi from 'src/api/authApi'
import { useAuth } from 'src/contexts/AuthProvider'
import { login } from 'src/serivces/auth'

const Login = () => {
  const { setUserProfile } = useAuth()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const res = await login({
        accounName: user,
        password: pwd,
      })
      if (res.status === 200) {
        const accessToken = res?.data?.token
        const roles = res?.data?.role
        localStorage.setItem('accessToken', res?.data?.token)
        setUserProfile({ user, roles, accessToken })
        setUser('')
        setPwd('')
        navigate('/')
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {isLoading ? (
                    <div style={{ display: 'flex' }}>
                      <CSpinner style={{ margin: 'auto' }} color="primary" />
                    </div>
                  ) : (
                    <CForm onSubmit={handleSubmit}>
                      <h3>Sleepiness Camera</h3>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" type="submit">
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login