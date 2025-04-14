import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rrjemljqmehnnoxsvcqh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyamVtbGpxbWVobm5veHN2Y3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODc4MDEsImV4cCI6MjA1OTk2MzgwMX0.9P-J86oJhGo27sp44uOv3lwGFxmXoJXgGRcYudL20z8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
