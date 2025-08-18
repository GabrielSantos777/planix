import React from 'react'
import Layout from '@/components/Layout'
import { CategoryManagement } from '@/components/CategoryManagement'

const Categorias = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <CategoryManagement />
      </div>
    </Layout>
  )
}

export default Categorias