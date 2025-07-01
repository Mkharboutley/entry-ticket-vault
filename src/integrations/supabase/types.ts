export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          password_hash: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          password_hash: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          password_hash?: string
          role?: string
        }
        Relationships: []
      }
      auth_sessions: {
        Row: {
          created_at: string | null
          device_info: string
          expires_at: string
          id: string
          ip_address: string | null
          login_method: string
          national_id: string
          session_token: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_info: string
          expires_at: string
          id?: string
          ip_address?: string | null
          login_method: string
          national_id: string
          session_token: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: string
          expires_at?: string
          id?: string
          ip_address?: string | null
          login_method?: string
          national_id?: string
          session_token?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      biometric_data: {
        Row: {
          confidence_score: number
          created_at: string | null
          face_encoding: string
          face_landmarks: Json | null
          id: string
          image_hash: string
          national_id: string
          user_id: string | null
        }
        Insert: {
          confidence_score: number
          created_at?: string | null
          face_encoding: string
          face_landmarks?: Json | null
          id?: string
          image_hash: string
          national_id: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number
          created_at?: string | null
          face_encoding?: string
          face_landmarks?: Json | null
          id?: string
          image_hash?: string
          national_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "biometric_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      draw_entries: {
        Row: {
          created_at: string | null
          draw_month: number
          draw_year: number
          entry_code: string
          id: string
          order_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          draw_month: number
          draw_year: number
          entry_code: string
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          draw_month?: number
          draw_year?: number
          entry_code?: string
          id?: string
          order_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "draw_entries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      draws: {
        Row: {
          created_at: string | null
          draw_date: string
          id: string
          month: number
          prize_name: string
          status: string | null
          total_entries: number | null
          winner_id: string | null
          winning_entry_code: string | null
          year: number
        }
        Insert: {
          created_at?: string | null
          draw_date: string
          id?: string
          month: number
          prize_name: string
          status?: string | null
          total_entries?: number | null
          winner_id?: string | null
          winning_entry_code?: string | null
          year: number
        }
        Update: {
          created_at?: string | null
          draw_date?: string
          id?: string
          month?: number
          prize_name?: string
          status?: string | null
          total_entries?: number | null
          winner_id?: string | null
          winning_entry_code?: string | null
          year?: number
        }
        Relationships: []
      }
      logs: {
        Row: {
          action: string
          admin_id: string | null
          details: Json | null
          id: string
          ticket_id: string | null
          timestamp: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          details?: Json | null
          id?: string
          ticket_id?: string | null
          timestamp?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          details?: Json | null
          id?: string
          ticket_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logs_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          quantity?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          name: string
          original_price: number | null
          price: number
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name: string
          original_price?: number | null
          price: number
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name?: string
          original_price?: number | null
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          biometric_hash: string | null
          client_token: string
          created_at: string | null
          device_id: string | null
          dob: string
          full_name: string
          gender: string
          id: string
          image_url: string
          national_id: string
          phone: string
          ticket_number: string
          updated_at: string | null
          visitor_id: string
        }
        Insert: {
          biometric_hash?: string | null
          client_token: string
          created_at?: string | null
          device_id?: string | null
          dob: string
          full_name: string
          gender: string
          id?: string
          image_url: string
          national_id: string
          phone: string
          ticket_number: string
          updated_at?: string | null
          visitor_id: string
        }
        Update: {
          biometric_hash?: string | null
          client_token?: string
          created_at?: string | null
          device_id?: string | null
          dob?: string
          full_name?: string
          gender?: string
          id?: string
          image_url?: string
          national_id?: string
          phone?: string
          ticket_number?: string
          updated_at?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          address_coordinates: Json | null
          alternative_phone: string | null
          box_number: string
          civil_registry: string
          created_at: string | null
          current_address: string
          date_of_birth: string
          email: string | null
          face_data: Json | null
          father_name: string
          full_name: string
          gender: string
          id: string
          image_url: string
          mother_name: string
          national_id: string
          phone_number: string
          place_of_birth: string
          ticket_number: string
          updated_at: string | null
        }
        Insert: {
          address_coordinates?: Json | null
          alternative_phone?: string | null
          box_number: string
          civil_registry: string
          created_at?: string | null
          current_address: string
          date_of_birth: string
          email?: string | null
          face_data?: Json | null
          father_name: string
          full_name: string
          gender: string
          id?: string
          image_url: string
          mother_name: string
          national_id: string
          phone_number: string
          place_of_birth: string
          ticket_number: string
          updated_at?: string | null
        }
        Update: {
          address_coordinates?: Json | null
          alternative_phone?: string | null
          box_number?: string
          civil_registry?: string
          created_at?: string | null
          current_address?: string
          date_of_birth?: string
          email?: string | null
          face_data?: Json | null
          father_name?: string
          full_name?: string
          gender?: string
          id?: string
          image_url?: string
          mother_name?: string
          national_id?: string
          phone_number?: string
          place_of_birth?: string
          ticket_number?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_entry_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_qr_data: {
        Args: { profile_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
