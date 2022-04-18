CREATE DATABASE romland_dev_test;

CREATE TABLE project(
    project_id UUID NOT NULL PRIMARY KEY,
    project_name VARCHAR(255),
    project_description TEXT,
    project_source_code_url TEXT,
    project_url TEXT
);

CREATE TABLE project_images(
    project_images_id UUID NOT NULL PRIMARY KEY,
    project_images_url TEXT,
    project_images_project_id UUID,
    CONSTRAINT fk_project_images
        FOREIGN KEY(project_images_id)
            REFERENCES project(project_id)
);

CREATE TABLE programming_language(
    programming_language_id UUID NOT NULL PRIMARY KEY,
    programming_language_name VARCHAR(255),
    programming_language_icon TEXT,
    programming_language_url TEXT
);

CREATE TABLE programming_language_project(
    programming_language_project_id UUID NOT NULL PRIMARY KEY,
    programming_language_project_pl_id UUID,
    programming_language_project_p_id UUID,
    CONSTRAINT fk_programming_language_project_pl
        FOREIGN KEY(programming_language_project_pl_id)
            REFERENCES programming_language(programming_language_id),
    CONSTRAINT fk_programming_language_project_p
        FOREIGN KEY(programming_language_project_p_id)
            REFERENCES project(project_id)
);