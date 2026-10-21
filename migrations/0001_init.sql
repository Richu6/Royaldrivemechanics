-- Royal Drive Mechanics - Cloudflare D1 Booking Schema
-- Migration 0001_init.sql

CREATE TABLE IF NOT EXISTS bookings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  reference     TEXT NOT NULL UNIQUE,       -- e.g. RDM-8F3K2A
  service       TEXT NOT NULL,
  slot_start    TEXT NOT NULL,              -- ISO 8601, stored in UTC
  slot_date     TEXT NOT NULL,              -- YYYY-MM-DD, America/Toronto
  slot_time     TEXT NOT NULL,              -- HH:MM, America/Toronto
  customer_name TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT NOT NULL,
  vehicle       TEXT NOT NULL,              -- "2018 Honda Civic"
  notes         TEXT,
  insurance_claim INTEGER DEFAULT 0,
  status        TEXT DEFAULT 'confirmed',   -- confirmed | cancelled
  email_status  TEXT DEFAULT 'pending',     -- sent | failed | pending
  created_at    TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_slot ON bookings(slot_date, slot_time);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(reference);
CREATE INDEX IF NOT EXISTS idx_bookings_email_status ON bookings(email_status);
