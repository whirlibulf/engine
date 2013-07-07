describe("EntityManager", function () {
    var EntityManager = require("engine/lib/managers/entity"),
    entities;

    beforeEach(function () {
        entities = new EntityManager();

        spyOn(entities, 'getAll').andCallThrough();
    });

    describe("create", function () {
        it("should return false if no ID is supplied", function () {
            expect(entities.create()).toBe(false);
        });

        it("should return true if an ID is supplied", function () {
            expect(entities.create("test")).toBe(true);
        });

        it("should return false if a duplicate entity already exists", function () {
            expect(entities.create("test")).toBe(true);
            expect(entities.create("test")).toBe(false);
        });
    });

    describe("get", function () {
        it("should return undefined if the entity does not exist", function () {
            expect(entities.get("test")).toBe(undefined);
        });

        it("should return the entity", function () {
            entities.create("test");
            expect(entities.get("test")).toBeDefined();
        });

        it("should return the correct entity", function () {
            entities.create("test1");
            entities.create("test2");
            expect(entities.get("test1").id).toBe("test1");
            expect(entities.get("test2").id).toBe("test2");
        });
    });

    describe("add", function () {
        it("should return false if entity does not exist", function () {
            expect(entities.add("component", "componentID", "entity")).toBe(false);
        });

        it("should add a component to an entity", function () {
            entities.create("test");
            expect(entities.add("fizz", "1", "test")).toBe(true);
        });

        it("should return false if entity already has that component type", function () {
            entities.create("test");
            expect(entities.add("fizz", "1", "test")).toBe(true);
            expect(entities.add("fizz", "2", "test")).toBe(false);
        });
    });

    describe("getAll", function () {
        it("should return null if no components of that type have been added", function () {
            expect(entities.getAll("bla")).toBe(null);
        });

        it("should return a array of entity IDs", function () {
            entities.create("test1");
            entities.create("test2");
            entities.create("test3");
            entities.create("test4");
            entities.add("fizz", "1", "test1");
            entities.add("fizz", "2", "test2");
            entities.add("buzz", "3", "test3");

            var list = entities.getAll("fizz");

            expect(list).toEqual(jasmine.any(Array));
            expect(list).toContain("test1");
            expect(list).toContain("test2");
            expect(list).not.toContain("test3");
            expect(list).not.toContain("test4");
        });
    });
});
