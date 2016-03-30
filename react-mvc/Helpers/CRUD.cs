using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.Helpers
{
    public class CRUD<T> : ICRUD<T> where T : class
    {
        DbContext _db;
        DbSet<T> _set;
        public CRUD(DbContext db)
        {
            _db = db;
            _set = _db.Set<T>();
        }

        public void Add(T newEntity, bool save = false)
        {
            _set.Add(newEntity);
            if (save) { this.Commit(); }
        }

        public void Delete(T entity, bool save = false)
        {
            _set.Remove(entity);
            if (save) { this.Commit(); }
        }

        public IEnumerable<T> FindAll()
        {
            return _set;
        }

        public T FindById(int id)
        {
            return _set.Find(id);
        }

        public int Commit()
        {
            return _db.SaveChanges();
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        public T FindByName(string name)
        {
            return _set.Find(name);
        }
    }
}
