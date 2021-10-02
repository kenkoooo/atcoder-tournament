CREATE TABLE IF NOT EXISTS tbl_user
(
    user_id    TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    PRIMARY KEY (user_id)
);


CREATE TABLE IF NOT EXISTS tbl_stage
(
    user_id    TEXT   NOT NULL,
    token_hash TEXT   NOT NULL,
    expires    BIGINT NOT NULL,
    PRIMARY KEY (user_id)
);
