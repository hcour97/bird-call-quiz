CREATE TABLE Users (
    id INT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),

    CONSTRAINT check_valid_email CHECK (email LIKE '%@%.%')
);

CREATE TABLE Birds (
    id INT PRIMARY KEY,
    bird_species VARCHAR(255),
    image_url VARCHAR(255)    
)

CREATE TABLE BirdCalls (
    id INT PRIMARY KEY,
    bird_id INT,
    CallType VARCHAR(255),
    AudioURL VARCHAR(255),

    FOREIGN KEY (bird_id) REFERENCES Birds(id)
)

CREATE TABLE quizzes (
    quiz_id INT PRIMARY KEY,
    location VARCHAR(255),
    bird_id INT,
    call_id INT
    
    FOREIGN KEY (bird_id) REFERENCES Birds(id),
    FOREIGN KEY (call_id) REFERENCES BirdCalls(id)
)