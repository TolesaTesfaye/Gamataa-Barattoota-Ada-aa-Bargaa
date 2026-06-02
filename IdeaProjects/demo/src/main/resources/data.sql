DELETE FROM users WHERE email = 'admin@example.com';

INSERT INTO users (name, email, password, role) VALUES
    ('Admin User', 'admin@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm', 'ADMIN');
