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

    describe("use", function () {
        it("should return false if not passed an object", function () {
            expect(systems.use()).toBe(false);
        });

        it("should return the system if added", function () {
            expect(systems.use(mock.system)).toBe(mock.system);
        });

        it("should accept a constructor function instead of object", function () {
            systems.use(mock.systemConstructor);
            expect(mock.systemConstructor).toHaveBeenCalled();
        });
    });
});
