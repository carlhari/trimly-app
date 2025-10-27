export interface ClerkUserCreatedEvent {
  data: {
    backup_code_enabled: boolean;
    banned: boolean;
    create_organization_enabled: boolean;
    create_organizations_limit: number | null;
    created_at: number;
    delete_self_enabled: boolean;
    email_addresses: any[]; // can refine to ClerkEmailAddress[] if needed
    enterprise_accounts: any[];
    external_accounts: any[];
    external_id: string | null;
    first_name: string | null;
    has_image: boolean;
    id: string;
    image_url: string;
    last_active_at: number | null;
    last_name: string | null;
    last_sign_in_at: number | null;
    legal_accepted_at: number | null;
    locked: boolean;
    lockout_expires_in_seconds: number | null;
    mfa_disabled_at: number | null;
    mfa_enabled_at: number | null;
    object: "user";
    passkeys: any[];
    password_enabled: boolean;
    phone_numbers: any[];
    primary_email_address_id: string | null;
    primary_phone_number_id: string | null;
    primary_web3_wallet_id: string | null;
    private_metadata: Record<string, unknown> | null;
    profile_image_url: string;
    public_metadata: Record<string, unknown>;
    saml_accounts: any[];
    totp_enabled: boolean;
    two_factor_enabled: boolean;
    unsafe_metadata: Record<string, unknown>;
    updated_at: number;
    username: string | null;
    verification_attempts_remaining: number | null;
    web3_wallets: any[];
  };
  event_attributes: {
    http_request: {
      client_ip: string;
      user_agent: string;
    };
  };
  instance_id: string;
  object: "event";
  timestamp: number;
  type: "user.created";
}
