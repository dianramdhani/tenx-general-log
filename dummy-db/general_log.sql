CREATE TABLE db_tenx.general_log (
    id INT NOT NULL,
    rawData TEXT NOT NULL,
    description VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    finish DATETIME NOT NULL,
    duration FLOAT NOT NULL,
    PRIMARY KEY (id)
);