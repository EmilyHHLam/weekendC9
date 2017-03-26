CREATE TABLE itteam (
    id SERIAL PRIMARY KEY,
    first_name character varying(80),
    last_name character varying(80)
);

CREATE TABLE taskinfo (
    id SERIAL PRIMARY KEY,
    ticket_id character varying(60),
    detail character varying(250)
);

CREATE TABLE tasking(
    id SERIAL PRIMARY KEY,
    task_id integer REFERENCES taskinfo,
    employee_id  integer REFERENCES itteam,
    complete BOOLEAN NOT NULL,
    delete BOOLEAN NOT NULL
);


INSERT INTO employee VALUES 
(1,'Emily', 'Hoang', 'project manager'),
(2,'Brit', 'Dickman', 'system admin'),
(3,'Nic', 'Wilson', 'team lead'),
(4,'Claudia', 'Calderas', 'Developer'),
(5,'Betsy', 'Rowley', 'Developer'),
(6,'Craig', 'Baird', 'QA'),
(7,'Lisa', 'Schoofs', 'QA')
;