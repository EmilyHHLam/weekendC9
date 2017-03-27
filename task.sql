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
    employee_id  integer REFERENCES employee,
    complete BOOL NOT NULL DEFAULT '0'
   
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

SELECT * FROM "warehouse" JOIN "warehouse_product"
ON "warehouse"."id" = "warehouse_product"."product_id"
JOIN "products" ON "products"."id" = "warehouse_product"."product_id"
WHERE "products"."description" = 'diet pepsi';

SELECT "taskinfo"."id" as id, "taskinfo"."ticket_id", "taskinfo"."detail" FROM "taskinfo" 
LEFT JOIN "tasking"
ON "taskinfo"."id" = "tasking"."task_id"
WHERE "tasking"."task_id" IS NULL
ORDER BY "taskinfo"."id" DESC;

--SELECT "tasking"."task_id" as "task_id", "taskinfo"."detail" , "taskinfo"."ticket_id", "employee"."first_name" as first_name FROM "taskinfo"
SELECT "tasking".*, "taskinfo".*  FROM "taskinfo"
JOIN "tasking" ON "tasking"."task_id" = "taskinfo"."id"
JOIN "employee" ON "employee"."id" = "tasking"."employee_id"
ORDER BY "tasking"."task_id";

WHERE "tasking"."id" = '11';
WHERE "tasking"."complete" IS FALSE

UPDATE "tasking" 