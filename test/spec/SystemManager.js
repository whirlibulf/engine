describe("SystemManager", function () {
    var SystemManager = require("engine/lib/managers/system"),
        systems,
        mock;

    beforeEach(function () {
        systems = new SystemManager();

        mock = {};
        mock.system = jasmine.createSpyObj('system', ['init']);
        mock.systemConstructor = function () {};
        spyOn(mock, 'systemConstructor');
    });

    describe("add", function () {
        it("should return false if not passed an object", function () {
            expect(systems.add()).toBe(false);
        });

        it("should return the system if added", function () {
            expect(systems.add(mock.system)).toBe(mock.system);
        });

        it("should accept a constructor function instead of object", function () {
            systems.add(mock.systemConstructor);
            expect(mock.systemConstructor).toHaveBeenCalled();
        });
    });
});
