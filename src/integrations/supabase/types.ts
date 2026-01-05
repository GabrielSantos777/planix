export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          currency: string | null
          current_balance: number | null
          id: string
          initial_balance: number | null
          is_active: boolean | null
          name: string
          type: Database["public"]["Enums"]["account_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          id?: string
          initial_balance?: number | null
          is_active?: boolean | null
          name: string
          type: Database["public"]["Enums"]["account_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          id?: string
          initial_balance?: number | null
          is_active?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["account_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown
          new_data: Json | null
          old_data: Json | null
          operation: string
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      boletos: {
        Row: {
          additional_info: Json | null
          amount: number
          barcode: string | null
          beneficiary: string
          created_at: string
          digitable_line: string | null
          due_date: string
          external_id: string
          id: string
          payer_document: string | null
          payer_name: string | null
          payment_date: string | null
          status: string
          synced_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_info?: Json | null
          amount: number
          barcode?: string | null
          beneficiary: string
          created_at?: string
          digitable_line?: string | null
          due_date: string
          external_id: string
          id?: string
          payer_document?: string | null
          payer_name?: string | null
          payment_date?: string | null
          status: string
          synced_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_info?: Json | null
          amount?: number
          barcode?: string | null
          beneficiary?: string
          created_at?: string
          digitable_line?: string | null
          due_date?: string
          external_id?: string
          id?: string
          payer_document?: string | null
          payer_name?: string | null
          payment_date?: string | null
          status?: string
          synced_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      budget_settings: {
        Row: {
          created_at: string
          enable_rollover: boolean | null
          enable_zero_based: boolean | null
          id: string
          savings_goal_percentage: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enable_rollover?: boolean | null
          enable_zero_based?: boolean | null
          id?: string
          savings_goal_percentage?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          enable_rollover?: boolean | null
          enable_zero_based?: boolean | null
          id?: string
          savings_goal_percentage?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      budgets: {
        Row: {
          category_id: string
          created_at: string
          id: string
          month: number
          notes: string | null
          planned_amount: number
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          month: number
          notes?: string | null
          planned_amount?: number
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          month?: number
          notes?: string | null
          planned_amount?: number
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "budgets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          is_default: boolean | null
          name: string
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string
          id: string
          name: string
          payment_day: number | null
          phone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          payment_day?: number | null
          phone: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          payment_day?: number | null
          phone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_card_invoices: {
        Row: {
          created_at: string
          credit_card_id: string
          due_date: string | null
          id: string
          month: number
          notes: string | null
          paid_amount: number
          payment_date: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          credit_card_id: string
          due_date?: string | null
          id?: string
          month: number
          notes?: string | null
          paid_amount?: number
          payment_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          created_at?: string
          credit_card_id?: string
          due_date?: string | null
          id?: string
          month?: number
          notes?: string | null
          paid_amount?: number
          payment_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "credit_card_invoices_credit_card_id_fkey"
            columns: ["credit_card_id"]
            isOneToOne: false
            referencedRelation: "credit_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_cards: {
        Row: {
          best_purchase_day: number | null
          card_type: Database["public"]["Enums"]["card_type"]
          closing_day: number
          created_at: string
          currency: string | null
          current_balance: number | null
          due_day: number
          id: string
          is_active: boolean | null
          limit_amount: number
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          best_purchase_day?: number | null
          card_type: Database["public"]["Enums"]["card_type"]
          closing_day: number
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          due_day: number
          id?: string
          is_active?: boolean | null
          limit_amount: number
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          best_purchase_day?: number | null
          card_type?: Database["public"]["Enums"]["card_type"]
          closing_day?: number
          created_at?: string
          currency?: string | null
          current_balance?: number | null
          due_day?: number
          id?: string
          is_active?: boolean | null
          limit_amount?: number
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string
          currency: string | null
          current_amount: number | null
          description: string | null
          id: string
          status: Database["public"]["Enums"]["goal_status"] | null
          target_amount: number
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          current_amount?: number | null
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["goal_status"] | null
          target_amount: number
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          current_amount?: number | null
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["goal_status"] | null
          target_amount?: number
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      investments: {
        Row: {
          average_price: number
          created_at: string
          currency: string | null
          current_price: number | null
          id: string
          name: string
          quantity: number
          symbol: string
          type: Database["public"]["Enums"]["investment_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          average_price: number
          created_at?: string
          currency?: string | null
          current_price?: number | null
          id?: string
          name: string
          quantity: number
          symbol: string
          type: Database["public"]["Enums"]["investment_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          average_price?: number
          created_at?: string
          currency?: string | null
          current_price?: number | null
          id?: string
          name?: string
          quantity?: number
          symbol?: string
          type?: Database["public"]["Enums"]["investment_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          id: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pending_transactions: {
        Row: {
          created_at: string
          id: string
          missing_fields: string[]
          status: string
          transaction_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          missing_fields: string[]
          status?: string
          transaction_data: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          missing_fields?: string[]
          status?: string
          transaction_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          cpf: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          subscription_end: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start: string | null
          trial_end: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          subscription_end?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          subscription_end?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rate_limit_log: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          ip_address: unknown
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address: unknown
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: unknown
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          account_id: string | null
          amount: number
          category_id: string | null
          contact_id: string | null
          created_at: string
          credit_card_id: string | null
          currency: string | null
          date: string
          description: string
          destination_account_id: string | null
          id: string
          installment_number: number | null
          installments: number | null
          investment_metadata: Json | null
          is_installment: boolean | null
          is_transfer: boolean | null
          notes: string | null
          source_account_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          amount: number
          category_id?: string | null
          contact_id?: string | null
          created_at?: string
          credit_card_id?: string | null
          currency?: string | null
          date?: string
          description: string
          destination_account_id?: string | null
          id?: string
          installment_number?: number | null
          installments?: number | null
          investment_metadata?: Json | null
          is_installment?: boolean | null
          is_transfer?: boolean | null
          notes?: string | null
          source_account_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          category_id?: string | null
          contact_id?: string | null
          created_at?: string
          credit_card_id?: string | null
          currency?: string | null
          date?: string
          description?: string
          destination_account_id?: string | null
          id?: string
          installment_number?: number | null
          installments?: number | null
          investment_metadata?: Json | null
          is_installment?: boolean | null
          is_transfer?: boolean | null
          notes?: string | null
          source_account_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_credit_card_id_fkey"
            columns: ["credit_card_id"]
            isOneToOne: false
            referencedRelation: "credit_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_destination_account_id_fkey"
            columns: ["destination_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_source_account_id_fkey"
            columns: ["source_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_consents: {
        Row: {
          consent_text: string
          consent_type: string
          consent_version: string
          created_at: string
          granted_at: string
          id: string
          ip_address: unknown
          is_active: boolean
          revoked_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          consent_text: string
          consent_type?: string
          consent_version?: string
          created_at?: string
          granted_at?: string
          id?: string
          ip_address?: unknown
          is_active?: boolean
          revoked_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          consent_text?: string
          consent_type?: string
          consent_version?: string
          created_at?: string
          granted_at?: string
          id?: string
          ip_address?: unknown
          is_active?: boolean
          revoked_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_cpf_tokens: {
        Row: {
          cpf_token: string
          created_at: string
          encrypted_cpf: string
          id: string
          last_used_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cpf_token: string
          created_at?: string
          encrypted_cpf: string
          id?: string
          last_used_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cpf_token?: string
          created_at?: string
          encrypted_cpf?: string
          id?: string
          last_used_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_integrations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          phone_number: string
          user_id: string
          webhook_token: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          phone_number: string
          user_id: string
          webhook_token: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          phone_number?: string
          user_id?: string
          webhook_token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_endpoint: string
          p_ip_address: unknown
          p_max_requests?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_old_audit_logs: { Args: never; Returns: number }
      cleanup_rate_limit_logs: { Args: never; Returns: number }
      create_security_backup: { Args: never; Returns: string }
      create_whatsapp_integration: {
        Args: {
          p_phone_number: string
          p_user_id: string
          p_webhook_token: string
        }
        Returns: string
      }
      deactivate_whatsapp_integration: {
        Args: { p_phone_number: string; p_user_id: string }
        Returns: boolean
      }
      decrypt_whatsapp_token: {
        Args: { encrypted_token: string }
        Returns: string
      }
      detect_suspicious_activity: {
        Args: never
        Returns: {
          details: string
          risk_level: string
          suspicious_activity: string
          user_id: string
        }[]
      }
      encrypt_whatsapp_token: { Args: { token: string }; Returns: string }
      generate_security_report: {
        Args: never
        Returns: {
          description: string
          metric: string
          value: number
        }[]
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      get_user_whatsapp_token: { Args: { user_uuid: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_profile_owner: { Args: { profile_user_id: string }; Returns: boolean }
      mask_sensitive_financial_data: {
        Args: {
          data_owner_id: string
          sensitive_value: number
          user_requesting_id: string
        }
        Returns: string
      }
      recompute_account_balance: {
        Args: { p_account_id: string }
        Returns: undefined
      }
      recompute_credit_card_balance: {
        Args: { p_card_id: string }
        Returns: undefined
      }
      sanitize_text_input: { Args: { input_text: string }; Returns: string }
      update_whatsapp_token: {
        Args: { new_token: string; phone: string; user_uuid: string }
        Returns: boolean
      }
      validate_cpf: { Args: { cpf: string }; Returns: boolean }
      validate_phone_number: { Args: { phone: string }; Returns: boolean }
      verify_financial_integrity: {
        Args: never
        Returns: {
          check_name: string
          details: string
          status: string
        }[]
      }
    }
    Enums: {
      account_type: "bank" | "savings" | "investment"
      app_role: "admin" | "moderator" | "user"
      card_type: "visa" | "mastercard" | "elo" | "amex"
      goal_status: "active" | "completed" | "paused"
      investment_type: "stocks" | "crypto" | "bonds" | "funds"
      subscription_plan: "basic" | "premium" | "enterprise" | "professional"
      transaction_type: "income" | "expense" | "transfer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["bank", "savings", "investment"],
      app_role: ["admin", "moderator", "user"],
      card_type: ["visa", "mastercard", "elo", "amex"],
      goal_status: ["active", "completed", "paused"],
      investment_type: ["stocks", "crypto", "bonds", "funds"],
      subscription_plan: ["basic", "premium", "enterprise", "professional"],
      transaction_type: ["income", "expense", "transfer"],
    },
  },
} as const
