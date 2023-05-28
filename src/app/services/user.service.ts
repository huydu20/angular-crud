import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly UsersStorageKey = 'users';

  private currentUser!: User | null;
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private users: User[] = [];
  private filteredUsers: User[] = [];
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private lengthUsersSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  users$: Observable<User[]> = this.usersSubject.asObservable();
  lengthUsers$: Observable<number> = this.lengthUsersSubject.asObservable();
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private storageService: LocalStorageService, private router: Router) {}

  fetchDataFromLocalStorage() {
    this.users = this.storageService.getValue<User[]>(UserService.UsersStorageKey) || [];
    this.filteredUsers = [...this.users];
    this.currentUser = this.storageService.getValue<User>('currentUser') || null;
    this.updateData();
  }

  updateToLocalStorage() {
    this.storageService.setObject(UserService.UsersStorageKey, this.users);
    this.filterUsers(null, false);
    this.updateData();
  }

  importDataFromFile(users: User[]) {
    this.users = users;
    this.updateToLocalStorage();
  }

  addUser(username: string, password: string, firstName: string, lastName: string): Boolean {
    const user = this.users.find((user) => user.username === username);
    if (user) {
      return false;
    } else {
      const id = new Date(Date.now()).getTime();
      const newUser = new User(id, username, password, firstName, lastName);
      this.users.unshift(newUser);
      this.updateToLocalStorage();
      return true;
    }
  }

  updateUser(id: number, data: User) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1, data);
    this.updateToLocalStorage();
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    this.updateToLocalStorage();
  }

  getUserByID(id: number): Observable<User | null> {
    let user = this.users.find((user) => user.id === id) || null;
    return of(user).pipe(delay(500));
  }

  filterUsers(key: string | null, isFiltering: boolean = true) {
    if (key) {
      this.filteredUsers = this.users.filter((user) => user.username.toLowerCase().includes(key.toLowerCase()));
    } else {
      this.filteredUsers = [...this.users];
    }
    if (isFiltering) {
      this.updateData();
    }
  }

  login(username: string, password: string): Boolean {
    const user = this.users.find((user) => user.username === username && user.password === password);
    console.log(user);
    if (!user) {
      return false;
    } else {
      this.storageService.setObject('currentUser', user);
      this.currentUser = user;
      this.currentUserSubject?.next(this.currentUser);
      this.router.navigate(['']);
      return true;
    }
  }

  logout() {
    this.currentUser = null;
    this.currentUserSubject.next(this.currentUser);
    this.storageService.remove('currentUser');
    this.router.navigate(['/account/login']);
  }

  private updateData() {
    this.currentUserSubject?.next(this.currentUser);
    this.usersSubject.next(this.filteredUsers);
    this.lengthUsersSubject.next(this.users.length);
  }
}
